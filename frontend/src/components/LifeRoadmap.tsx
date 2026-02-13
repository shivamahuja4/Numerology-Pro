'use client';

import React from 'react';
import PinnacleChallengeTable from './PinnacleChallengeTable';

type Props = {
    pinnacleData: any[];
};

export default function LifeRoadmap({ pinnacleData }: Props) {
    if (!pinnacleData) return null;

    return (
        <div className="flex flex-col h-full gap-6">
            {/* Pinnacle Table */}
            <div className="shrink-0">
                <PinnacleChallengeTable data={pinnacleData} />
            </div>
        </div>
    );
}
