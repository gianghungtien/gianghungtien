import React from 'react'
import Link from 'next/link'
import SectionTitle from '../SectionTitle/SectionTitle'

const Expriences = [
    {
        date: '2017 - 2018',
        logo: 'images/work/1.png',
        position: 'Project Coordinator',
        companyName: 'Yeah1 Group',
        workFrom: '(Fulltime)',
        link: 'yeah1group.com',
    },
    {
        date: '2018 - 2020',
        logo: 'images/work/2.png',
        position: 'Sr. Digital Marketing',
        companyName: 'The Fitout',
        workFrom: '(Fulltime)',
        link: 'thefitoutcompany.com',
    },
    {
        date: '2021 - 2022',
        logo: 'images/work/3.png',
        position: 'Sr. Digital Marketing',
        companyName: 'TheHive Dubai',
        workFrom: '(Fulltime)',
        link: 'liveathive.ae',
    },
    {
        date: '2021 - NOW',
        logo: 'images/work/4.png',
        position: 'FOUNDER',
        companyName: 'FigX LTD',
        workFrom: '(Remote)',
        link: 'figx.app',
    },

]


const ExprienceSec = (props) => {
    return (
        <div className="wpo-work-area section-padding">
            <div className="container">
                <SectionTitle Title={'My Work Experience'} />
                <div className="wpo-work-wrap">
                    {Expriences.map((exprience, exp) => (
                        <div className="wpo-work-item" key={exp}>
                            <ul>
                                <li className="date">{exprience.date}</li>
                                <li className="logo"><img src={exprience.logo} alt="" /></li>
                                <li className="position">{exprience.position} <span>{exprience.companyName} <span>{exprience.workFrom}</span> - {exprience.link}</span></li>
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <div className="shape-wk">
                <svg width="1500" height="1500" viewBox="0 0 1500 1500" fill="none">
                    <g opacity="0.45" filter="url(#filter0_f_39_4214)">
                        <circle cx="750" cy="750" r="200" />
                    </g>
                    <defs>
                        <filter id="filter0_f_39_4214" x="0" y="0" width="1500" height="1500"
                            filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="275" result="effect1_foregroundBlur_39_4212" />
                        </filter>
                    </defs>
                </svg>
            </div>
        </div>
    )
}

export default ExprienceSec;