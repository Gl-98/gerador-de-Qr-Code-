import React from 'react';

export const CompanyLogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        viewBox="0 0 150 40" 
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <text 
            x="50%" 
            y="50%" 
            dominantBaseline="middle" 
            textAnchor="middle" 
            fontFamily="Montserrat, sans-serif" 
            fontSize="28" 
            fontWeight="bold" 
            fill="currentColor"
        >
            UMISAN
        </text>
    </svg>
);