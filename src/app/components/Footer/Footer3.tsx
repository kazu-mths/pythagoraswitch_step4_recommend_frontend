// components/Footer.js
'use client';
import { useRef, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const Footer3 = () => {
    return (
        <div style={{ backgroundColor: '#F4F4F4' }} className="fixed inset-x-0 bottom-0 h-24  text-white flex justify-around items-center px-4 py-2">
            <div>
                <img src="/g_home_icon.svg" alt="Home" className="w-14 h-14"/>
            </div>
            <div>
                <img src="/g_quest_icon.svg" alt="Search" className="w-14 h-14"/>
            </div>
            <div>
                <img src="/scan_icon.svg" alt="Profile" className="w-14 h-14"/>
            </div>
        </div>
    );
};

export default Footer3;
