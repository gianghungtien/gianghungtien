import React, { useState } from 'react';
import Slider from "react-slick";

const testimonial = [
    {
        id: '01',
        tImg: 'images/testimonial/1.jpg',
        tTitle:'Process was simple!',
        Des: "Every time I call there is someone helpful and knowledgeable and I've never felt stupid! I know sometimes when agents are under deadlines and things go wrong - it's very nice to be able to call and have a calm demeanor on the other end of the line! Thank you so much!",
        Title: 'Harry Abraham',
        Sub: "Founder of SBC",
    },
    {
        id: '02',
        tImg: 'images/testimonial/2.jpg',
        tTitle:'Got the Help I Needed',
        Des: "I needed help registering a plugin and my inquiry was answered in a timely manner and the instructions were clear and resolved my issue. I have found the products to be of high quality and great price.",
        Title: 'Tiffany C. Gundy',
        Sub: "SCG First Company",
    },
    {
        id: '03',
        tImg: 'images/testimonial/3.jpg',
        tTitle:'Help is available',
        Des: "Help is available, knowledgeable, kind, professional, customer oriented. So refreshing to get all of these nowadays! I have other software companies for my other professions and I wish they had such great service!",
        Title: 'Georgia Van Buie',
        Sub: "Head of Marketing at Skyhawk Kinetic",
    },
    {
        id: '04',
        tImg: 'images/testimonial/4.jpg',
        tTitle:'Mainly a good bussiness',
        Des: "All in all, it is a good bussiness with competitive products. Though functionality of some of them needs improvement (Outlaw Lite, for example), the interface is quite appealing. Free sample packs are also a good addition to other stuff. E-mails were coming even after managing subscription in the profile (unsubscribe button didn't work for the first time). This is a minor drawback. The rest is fine.",
        Title: 'Amanda Longenecker',
        Sub: "Sale Manager at Keystone Electrical",
    },
    {
        id: '05',
        tImg: 'images/testimonial/5.jpg',
        tTitle:'Economically, Precise, Forthright',
        Des: "I've only been with you a short while. Your staff is very forthright in their assessments of your personal situation. You have made it economically favorable Thank you again",
        Title: 'Kandice C. Bennett',
        Sub: "Sales at Dotted.com",
    },
    {
        id: '06',
        tImg: 'images/testimonial/6.jpg',
        tTitle:'Fantastic',
        Des: "Their customer service is fantastic! I usually call them over pilot error and they never make me feel like an idiot for calling, 😂. They walk me through the task to get back on track with a transaction!",
        Title: 'Hala Mustafa',
        Sub: "Dental Doctor at 1385 Dental Studio",
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