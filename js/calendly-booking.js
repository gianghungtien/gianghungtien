/**
 * Calendly API Booking Integration
 * Custom booking interface using Calendly API v2
 */

class CalendlyBooking {
    constructor() {
        this.apiToken = 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzQ4MDkyNjM0LCJqdGkiOiJhMjhkNTYxYi00N2YzLTQyNWEtOWQ4Ni02MjE3OWM2YjU2ZWYiLCJ1c2VyX3V1aWQiOiI3OThjZTZmOS1kYWY3LTQyMzgtODcyYy0xNGZlNGVkZWY5NjEifQ.F7nou7C2H5OU2LjfcDT7iTRGn4a7tizUrHKlENA592a55bUH_TXQp_fWEej6ForTIBRnwFQx8JZMRFJa0qvB6A';
        this.baseURL = 'https://api.calendly.com';
        this.calendlyURL = 'https://calendly.com/jasongiang/30min';
        this.selectedEventType = null;
        this.selectedDate = null;
        this.selectedTime = null;
        this.currentUser = null;
        this.eventTypes = [];
        
        this.init();
    }

    async init() {
        try {
            console.log('Initializing Calendly booking...');
            
            // First test if we can make API calls (CORS might be an issue)
            const canUseAPI = await this.testAPIConnection();
            
            if (!canUseAPI) {
                console.log('API not accessible, falling back to Calendly widget');
                this.showCalendlyWidget();
                return;
            }
            
            await this.getCurrentUser();
            console.log('Current user:', this.currentUser);
            
            await this.getEventTypes();
            console.log('Event types:', this.eventTypes);
            console.log('Selected event type:', this.selectedEventType);
            
            if (!this.selectedEventType) {
                throw new Error('No suitable event type found');
            }
            
            this.renderDatePicker();
            this.hideLoading();
        } catch (error) {
            console.error('Initialization error:', error);
            console.log('Falling back to Calendly widget due to error');
            this.showCalendlyWidget();
        }
    }

    async testAPIConnection() {
        try {
            const response = await fetch(`${this.baseURL}/users/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.apiToken}`,
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('API test response status:', response.status);
            return response.status === 200 || response.status === 401; // Even 401 means API is accessible
        } catch (error) {
            console.error('API test failed:', error);
            return false; // Likely CORS issue
        }
    }

    showCalendlyWidget() {
        const container = document.querySelector('.custom-booking-container');
        if (container) {
            container.innerHTML = `
                <div class="calendly-fallback">
                    <h4 style="margin-bottom: 1rem; text-align: center;">Schedule Your Consultation</h4>
                    <p style="text-align: center; margin-bottom: 2rem; color: var(--text-light);">
                        Click the button below to open the booking calendar in a new window.
                    </p>
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <a href="${this.calendlyURL}" target="_blank" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-external-link-alt"></i>
                            Book Your Meeting
                        </a>
                    </div>
                </div>
            `;
        }
    }

    async makeAPICall(endpoint, method = 'GET', body = null) {
        const url = `${this.baseURL}${endpoint}`;
        console.log(`Making API call: ${method} ${url}`);
        
        const options = {
            method,
            headers: {
                'Authorization': `Bearer ${this.apiToken}`,
                'Content-Type': 'application/json'
            }
        };

        if (body) {
            options.body = JSON.stringify(body);
            console.log('Request body:', body);
        }

        try {
            const response = await fetch(url, options);
            console.log(`API response status: ${response.status}`);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('API error response:', errorText);
                throw new Error(`API call failed: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const data = await response.json();
            console.log('API response data:', data);
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const response = await this.makeAPICall('/users/me');
            this.currentUser = response.resource;
            
            if (!this.currentUser) {
                throw new Error('Failed to get current user information');
            }
        } catch (error) {
            console.error('Error getting current user:', error);
            throw new Error('Unable to authenticate with Calendly. Please check your API token.');
        }
    }

    async getEventTypes() {
        try {
            const response = await this.makeAPICall(`/event_types?user=${this.currentUser.uri}`);
            this.eventTypes = response.collection || [];
            
            console.log('All event types:', this.eventTypes);
            
            if (this.eventTypes.length === 0) {
                throw new Error('No event types found for this user');
            }
            
            // Find the 30min consultation event type - try multiple strategies
            this.selectedEventType = this.eventTypes.find(et => 
                et.name && (
                    et.name.toLowerCase().includes('30') || 
                    et.name.toLowerCase().includes('consultation') ||
                    et.name.toLowerCase().includes('meeting')
                )
            );
            
            // If no specific match, use the first available event type
            if (!this.selectedEventType) {
                this.selectedEventType = this.eventTypes[0];
                console.warn('No specific event type found, using first available:', this.selectedEventType);
            }
            
            console.log('Selected event type:', this.selectedEventType);
            
            // Verify we have required properties
            if (!this.selectedEventType.uuid) {
                console.error('Event type missing uuid:', this.selectedEventType);
                throw new Error('Selected event type is missing required UUID');
            }
            
        } catch (error) {
            console.error('Error getting event types:', error);
            throw new Error('Failed to load available meeting types');
        }
    }

    renderDatePicker() {
        const datePicker = document.getElementById('date-picker');
        if (!datePicker) {
            console.error('Date picker element not found');
            return;
        }
        
        const today = new Date();
        const dates = [];
        
        // Generate next 21 days (3 weeks) starting from tomorrow
        for (let i = 1; i <= 21; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push(date);
        }

        datePicker.innerHTML = dates.map(date => {
            const dateStr = date.toISOString().split('T')[0];
            const displayDate = date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });
            
            return `
                <button class="date-option" data-date="${dateStr}" onclick="calendlyBooking.selectDate('${dateStr}')">
                    ${displayDate}
                </button>
            `;
        }).join('');
    }

    async selectDate(dateStr) {
        try {
            console.log('Selecting date:', dateStr);
            this.selectedDate = dateStr;
            
            // Update UI
            document.querySelectorAll('.date-option').forEach(btn => btn.classList.remove('selected'));
            const selectedBtn = document.querySelector(`[data-date="${dateStr}"]`);
            if (selectedBtn) {
                selectedBtn.classList.add('selected');
            }
            
            // Show loading for time slots
            const timeSlotsContainer = document.getElementById('time-slots-container');
            if (timeSlotsContainer) {
                timeSlotsContainer.innerHTML = `
                    <div style="text-align: center; padding: 2rem;">
                        <div class="loading-spinner"></div>
                        <p>Loading available times...</p>
                    </div>
                `;
            }
            
            // Load time slots for selected date
            await this.loadTimeSlots(dateStr);
            
            // Show time slots section
            const timeSlotsSection = document.getElementById('time-slots');
            if (timeSlotsSection) {
                timeSlotsSection.style.display = 'block';
            }
        } catch (error) {
            console.error('Error selecting date:', error);
            this.showError('Failed to load available times for selected date');
        }
    }

    async loadTimeSlots(date) {
        try {
            if (!this.selectedEventType || !this.selectedEventType.uuid) {
                throw new Error('No event type selected or missing UUID');
            }
            
            console.log('Loading time slots for date:', date);
            console.log('Event type UUID:', this.selectedEventType.uuid);
            
            const startTime = `${date}T00:00:00.000Z`;
            const endTime = `${date}T23:59:59.000Z`;
            
            // Get availability for the selected date
            const endpoint = `/event_types/${this.selectedEventType.uuid}/available_times?start_time=${startTime}&end_time=${endTime}`;
            console.log('Calling availability endpoint:', endpoint);
            
            const response = await this.makeAPICall(endpoint);
            
            const timeSlots = response.collection || [];
            console.log('Available time slots:', timeSlots);
            
            this.renderTimeSlots(timeSlots);
        } catch (error) {
            console.error('Error loading time slots:', error);
            // Show manual booking option instead of error
            this.renderManualBooking(date);
        }
    }

    renderTimeSlots(timeSlots) {
        const container = document.getElementById('time-slots-container');
        if (!container) {
            console.error('Time slots container not found');
            return;
        }
        
        if (timeSlots.length === 0) {
            container.innerHTML = `
                <p class="no-slots">No available times for this date. Please select another date or use the direct booking link below.</p>
                <div style="text-align: center; margin-top: 1rem;">
                    <a href="${this.calendlyURL}" target="_blank" class="btn btn-outline">
                        <i class="fas fa-external-link-alt"></i>
                        Book Directly on Calendly
                    </a>
                </div>
            `;
            return;
        }

        container.innerHTML = timeSlots.map(slot => {
            const time = new Date(slot.start_time);
            const timeStr = time.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            
            return `
                <button class="time-slot" data-time="${slot.start_time}" onclick="calendlyBooking.selectTime('${slot.start_time}')">
                    ${timeStr}
                </button>
            `;
        }).join('');
    }

    renderManualBooking(date) {
        const container = document.getElementById('time-slots-container');
        if (container) {
            container.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <p style="margin-bottom: 1rem;">Unable to load available times for ${date}.</p>
                    <p style="margin-bottom: 2rem; color: var(--text-light);">
                        Please use the direct booking link to see all available times:
                    </p>
                    <a href="${this.calendlyURL}" target="_blank" class="btn btn-primary">
                        <i class="fas fa-external-link-alt"></i>
                        Book on Calendly
                    </a>
                </div>
            `;
        }
    }

    selectTime(timeStr) {
        try {
            console.log('Selecting time:', timeStr);
            this.selectedTime = timeStr;
            
            // Update UI
            document.querySelectorAll('.time-slot').forEach(btn => btn.classList.remove('selected'));
            const selectedBtn = document.querySelector(`[data-time="${timeStr}"]`);
            if (selectedBtn) {
                selectedBtn.classList.add('selected');
            }
            
            // Show booking details form
            const bookingDetails = document.getElementById('booking-details');
            if (bookingDetails) {
                bookingDetails.style.display = 'block';
            }
            
            // Update selected time info
            const time = new Date(timeStr);
            const displayTime = time.toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
                timeZoneName: 'short'
            });
            
            const selectedTimeInfo = document.getElementById('selected-time-info');
            if (selectedTimeInfo) {
                selectedTimeInfo.innerHTML = `
                    <div class="selected-time">
                        <strong>Selected Time:</strong> ${displayTime}
                    </div>
                `;
            }
            
            // Setup form submission
            this.setupFormSubmission();
        } catch (error) {
            console.error('Error selecting time:', error);
        }
    }

    setupFormSubmission() {
        const form = document.getElementById('booking-submission-form');
        if (form && !form.hasAttribute('data-setup')) {
            form.setAttribute('data-setup', 'true');
            form.onsubmit = async (e) => {
                e.preventDefault();
                await this.submitBooking();
            };
        }
    }

    async submitBooking() {
        const name = document.getElementById('booking-name').value;
        const email = document.getElementById('booking-email').value;
        const message = document.getElementById('booking-message').value;
        
        if (!name || !email) {
            alert('Please fill in all required fields.');
            return;
        }

        const submitBtn = document.getElementById('confirm-booking');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting to Calendly...';
        }

        try {
            console.log('Submitting booking with data:', { name, email, message, selectedTime: this.selectedTime });
            
            // Create a pre-filled Calendly URL
            const bookingURL = `${this.calendlyURL}?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;
            
            // Redirect to Calendly with pre-filled information
            window.open(bookingURL, '_blank');
            
            // Show success message
            setTimeout(() => {
                this.showSuccess();
            }, 1000);
            
        } catch (error) {
            console.error('Booking error:', error);
            this.showError('Failed to create booking. Please try again or contact me directly.');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-calendar-check"></i> Confirm Booking';
            }
        }
    }

    hideLoading() {
        const loadingState = document.getElementById('loading-state');
        const bookingForm = document.getElementById('booking-form');
        
        if (loadingState) loadingState.style.display = 'none';
        if (bookingForm) bookingForm.style.display = 'block';
    }

    showSuccess() {
        const bookingForm = document.getElementById('booking-form');
        const bookingSuccess = document.getElementById('booking-success');
        
        if (bookingForm) bookingForm.style.display = 'none';
        if (bookingSuccess) {
            bookingSuccess.style.display = 'block';
            // Update success message
            const successText = bookingSuccess.querySelector('p');
            if (successText) {
                successText.textContent = 'You have been redirected to Calendly to complete your booking. Please check the new tab/window.';
            }
        }
    }

    showError(message) {
        const loadingState = document.getElementById('loading-state');
        const bookingForm = document.getElementById('booking-form');
        const bookingError = document.getElementById('booking-error');
        const errorMessage = document.getElementById('error-message');
        
        if (loadingState) loadingState.style.display = 'none';
        if (bookingForm) bookingForm.style.display = 'none';
        if (errorMessage) errorMessage.textContent = message;
        if (bookingError) bookingError.style.display = 'block';
    }

    reset() {
        this.selectedDate = null;
        this.selectedTime = null;
        
        // Hide all sections except loading
        const elements = [
            'booking-success',
            'booking-error', 
            'booking-form',
            'time-slots',
            'booking-details'
        ];
        
        elements.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.style.display = 'none';
        });
        
        const loadingState = document.getElementById('loading-state');
        if (loadingState) loadingState.style.display = 'block';
        
        // Clear form
        const form = document.getElementById('booking-submission-form');
        if (form) form.reset();
        
        // Re-initialize
        setTimeout(() => this.init(), 500);
    }
}

// Global function for reset button
function resetBookingForm() {
    if (window.calendlyBooking) {
        window.calendlyBooking.reset();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.calendlyBooking = new CalendlyBooking();
}); 