"use client";
import React from 'react';
import Login from './components/Token/Login';

export default function Home() {
  return (
      <main>
        <div className="mx-auto sm:max-w-[375px]">
          <Login />
        </div>
      </main>
  );
}