import './featureCard.css';
import React from 'react';

export default function FeatureCard({imgSrc, title, content, alt}) {
  return (
    <div className="feature-item">
        <img src={imgSrc} alt={alt} className="feature-icon" />
          <h3 className="feature-item-title">{title}</h3>
          <p>{content}</p>
    </div>
  ) 
}
