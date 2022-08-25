import React from 'react'
import Link from 'next/link'
import SectionTitle from '../SectionTitle/SectionTitle'

const Expriences = [
    {
        date: 'JUN 2017',
        date2: 'JUL 2018',
        logo: 'images/work/1.png',
        position: 'Project Coordinator',
        companyName: 'Yeah1 Group - Singapore',
        workFrom: '(Fulltime)',
        link: 'https://yeah1group.com',
    },
    {
        date: 'AUG 2018',
        date2: 'NOV 2020',
        logo: 'images/work/2.png',
        position: 'Sr. Digital Marketing',
        companyName: 'The Fitout - Vietnam',
        workFrom: '(Fulltime)',
        link: 'https://thefitoutcompany.com',
    },
    {
        date: 'APR 2021',
        date2: 'JUN 2022',
        logo: 'images/work/3.png',
        position: 'Sr. Digital Marketing',
        companyName: 'TheHive - Dubai, UAE',
        workFrom: '(Fulltime)',
        link: 'https://liveathive.ae',
    },
    {
        date: 'APR 2021',
        date2: 'TO NOW',
        logo: 'images/work/4.png',
        position: 'FOUNDER',
        companyName: 'FigX LTD - United Kingdom',
        workFrom: '(Remote)',
        link: 'https://figx.app',
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
                                <li className="date">{exprience.date} <br/>{exprience.date2}</li>
                                <li className="logo"><img src={exprience.logo} alt="" /></li>
                                <li className="position">{exprience.position} <span><a href={exprience.link}>{exprience.companyName}</a> <span>{exprience.workFrom}</span></span></li>
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