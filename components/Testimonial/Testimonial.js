import React, { useState } from 'react';
import Slider from "react-slick";

const testimonial = [
    {
        id: '01',
        tImg: 'images/testimonial/1.jpg',
        tTitle:'Process was simple!',
        Des: "Process was simple. Put in specifications of the phone: carrier, brand, model, color, capacity and then the lock status and you get a quote. They provide a prepaid label to send in your device and you get either PayPal or a check sent to you. It was quick and easy.",
        Title: 'Claire',
        Sub: "Founder of SB",
    },
    {
        id: '02',
        tImg: 'images/testimonial/2.jpg',
        tTitle:'Software Support',
        Des: "Had an issue trying to get a download I purchased to work. Steven from the support team was able to quickly assist me and get the problem solved and the download was able to work. Excellent support to get me quickly back on track is worth its weight in gold!",
        Title: 'Harry Abraham',
        Sub: "SCG First Company",
    },
    {
        id: '03',
        tImg: 'images/testimonial/3.jpg',
        tTitle:'Exciting eye-opening world of possibilities.',
        Des: "This has been the most helpful and exciting eye-opening world of possibilities. Steven was very clear and present in the chat and her willingness to help was great. I appreciate the support and the time walking through the steps and the why. This program has been a God send. Absolutely back up against the wall with bills, can't wait to be the next success story.        ",
        Title: 'Benjir Walton',
        Sub: "Merketer",
    },
    {
        id: '04',
        tImg: 'images/testimonial/4.jpg',
        tTitle:'One of the most motivational.',
        Des: "One of the most motivational training sessions ever with Steven this morning. He has definitely found his calling and is a great motivator and has lots of experience in guiding people to build funnels.",
        Title: 'Benjir Walton',
        Sub: "Merketer",
    },
    {
        id: '05',
        tImg: 'images/testimonial/5.jpg',
        tTitle:'Killer session with Steven.',
        Des: "Had a session with Steven. Very knowledge about different markets and how to narrow down the focus on creating the dream customer avatar (along with in-depth research processes). Great session!",
        Title: 'Kandice C. Bennett',
        Sub: "Sales at Dotted.com",
    },
    {
        id: '06',
        tImg: 'images/testimonial/6.jpg',
        tTitle:'Best training ever...',
        Des: "All the coaches are great. Morag was fantastic today. All questions were answered. Must be ready though because it is chock-full of info. The coaches review your funnel as many times as you want and help you in real-time. Love it and can't wait to send my kids through this training.",
        Title: 'Georgia Van Buie',
        Sub: "Merketer at Skyhawk Kinetic",
    },
]

const Testimonial = () => {

    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();


    return (
        <section className="wpo-testimonial-section section-padding">
            <div className="container">
                <div className="wpo-testimonial-wrap">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-12">
                            <div className="testimonial-left">
                                <div className="testimonial-left-inner">
                                    <div className="slider-for">
                                        <Slider asNavFor={nav2} ref={(slider1) => setNav1(slider1)} dots={false} arrows={false} fade={true}>
                                            {
                                                testimonial.map((tesmnl, tsm) => (
                                                    <div className="testimonial-img" key={tsm}>
                                                        <img src={tesmnl.tImg} alt="" />
                                                    </div>
                                                ))
                                            }
                                        </Slider>
                                    </div>
                                    <div className="side-img-1"><img src='images/testimonial/2.jpg' alt="" /></div>
                                    <div className="side-img-2"><img src='images/testimonial/3.jpg' alt="" /></div>
                                    <div className="side-img-3"><img src='images/testimonial/4.jpg' alt="" /></div>
                                    <div className="side-img-4"><img src='images/testimonial/5.jpg' alt="" /></div>
                                    <div className="side-img-5"><img src='images/testimonial/6.jpg' alt="" /></div>
                                    <div className="border-s1"></div>
                                    <div className="border-s2"></div>
                                    <div className="border-s3"></div>
                                </div>
                                <div className="shape-t">
                                    <svg width="750" height="750" viewBox="0 0 750 750" fill="none">
                                        <g filter="url(#filter0_f_39_4154)">
                                            <circle r="125" transform="matrix(-1 0 0 1 375 375)" fillOpacity="0.4" />
                                        </g>
                                        <defs>
                                            <filter id="filter0_f_39_4154" x="0" y="0" width="750" height="750"
                                                filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix"
                                                    result="shape" />
                                                <feGaussianBlur stdDeviation="125"
                                                    result="effect1_foregroundBlur_39_4154" />
                                            </filter>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-12">
                            <div className="wpo-testimonial-items">
                                <div className="slider-nav">
                                    <Slider
                                        asNavFor={nav1}
                                        ref={(slider2) => setNav2(slider2)}
                                        slidesToShow={1}
                                        dots={true}
                                        swipeToSlide={true}
                                        focusOnSelect={true}
                                    >
                                        {
                                            testimonial.map((tesmnl, tsm) => (
                                                <div className="wpo-testimonial-item" key={tsm}>
                                                    <div className="wpo-testimonial-text">
                                                        <h4>{tesmnl.tTitle}</h4>
                                                        <p>{tesmnl.Des}</p>
                                                        <div className="wpo-testimonial-text-btm">
                                                            <h3>{tesmnl.Title}, <span>{tesmnl.Sub}</span></h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }

                                    </Slider>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="left-shape"></div>
            <div className="right-shape"><img src="images/testimonial/shape.png" alt="" /></div>
        </section>
    );
}

export default Testimonial;