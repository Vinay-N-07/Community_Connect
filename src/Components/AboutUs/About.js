import React from 'react';
import './About.css'

const Main = () => {

    return (
        <div className='about-main'>
            <div className='about-title'>Community Compass</div>
            <div className='about-intro'>
                <p>At <strong>Community Compass</strong>, we are dedicated to fostering a vibrant and supportive community through our diverse range of services. Established in 2024, our mission is to <span class="highlight">empower individuals and families, address pressing social issues, and create opportunities for growth and connection</span>. We believe in the power of collective action and strive to make a positive impact on the lives of those we serve.</p>

                <p>Our team of passionate volunteers and professionals work tirelessly to provide <span class="highlight">educational resources, emergency assistance, social service and community outreach</span>. With a focus on inclusivity and compassion, we are committed to meeting the unique needs of our community members and supporting them through every stage of their journey.</p>

                <p>We take pride in our <span class="highlight">successful partnerships with local organizations and our track record of delivering effective programs and serving society</span>, and are continuously inspired by the resilience and strength of the people we serve. By fostering a spirit of collaboration and dedication, we aim to build a stronger, more connected community where everyone has the opportunity to thrive.</p>
            </div>

            <div className='about-main'>
                <h3>Features</h3>
                <p className='feature'>Forthcoming events : You can register for any event which you are interested to participate and volunteer.</p>
                <p className='feature'>Registered events: You can the events that you are registered and approval status of the event.</p>
                <p className='feature'>My Invitations: Once the event is approved by the Event manager, The invitations will be published, you can download them.</p>
            </div>
        </div>
    )

}

export default Main;