import React from 'react';
// components  and  functions
import Banner from '../components/Banner';
import FeatureCard from '../components/FeatureCard';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import {features} from '../assets/static-content';
// styles
import './homePage.css';


function HomePage()  {
    return  (
        <React.Fragment>
            <NavBar/>
            <main>
                <Banner/>
                <section className='features'>
                    <h2 className="sr-only">Features</h2>
                    {features.map((feature, index) => {
                        return <FeatureCard key={index} imgSrc={feature.imgSrc} title={feature.title} content={feature.content} alt={features.alt}/>
                    })}
                </section>
            </main>
            <Footer/>
        </React.Fragment>
 
)}

export default HomePage