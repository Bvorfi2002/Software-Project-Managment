import React from "react";
import { styled } from '@mui/material/styles';
import CircularProgress, {
    circularProgressClasses,
    CircularProgressProps,
  } from '@mui/material/CircularProgress';

function Loading() {
    return (
        <div>
            <svg width={0} height={0}>
                <defs>
                    <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#e01cd5" />
                        <stop offset="100%" stopColor="#1CB5E0" />
                    </linearGradient>
                </defs>
            </svg>
            <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
        </div>
    )
}

export default Loading;