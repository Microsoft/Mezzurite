// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import React from 'react';
import {withRouter} from 'react-router';
import {PerformanceTimingService, PerformanceTelemetryService, MezzuriteConstants} from '@microsoft/mezzurite-core';
import { MezzuriteReactUtils } from './performance-utils-react.service';

/**
 * Higher order component for adding Mezzurite router functionality to a React app. Instruments withRouter HOC from React-Router.
 * @param {*} WrappedComponent 
 */
const withMezzuriteRouter = (WrappedComponent) => {
    if (!window.mezzurite){
        window.mezzurite = {};
    }
    MezzuriteReactUtils.createMezzuriteObject(window.mezzurite);

    if (window.mezzurite.isCompatible === undefined){
        window.mezzurite.isCompatible = PerformanceTelemetryService.compatibilityCheck();
    }
    if (!window.mezzurite.isCompatible){
        console.warn("compatibility warning")
        return WrappedComponent;
    }
    // indicates that we are tracking router timings
    window.mezzurite.routerPerf = true;
    
    return withRouter((props) => {
        // this bool disables click handler (used for scenarios without Mezzurite Router HOC)
            if (window.mezzurite.routeUrl !== props.location.pathname){
                // handle re-route before complete timing capture cycle
                if (window.mezzurite.captureCycleStarted){
                    window.mezzurite.captureCycleStarted = false;
                    PerformanceTelemetryService.captureTimings(true);
                    window.performance.mark(MezzuriteConstants.vltMarkStart);
                    // starts a new capture cycle
                    PerformanceTelemetryService.startCaptureCycle();
                }
                else{
                    // starts the capture cycle to transmit telemetry if current pathname is different than routeUrl
                    PerformanceTelemetryService.startCaptureCycle();
                    // If first load, capture ALT
                    if (!window.mezzurite.firstViewLoaded){
                        window.performance.mark(MezzuriteConstants.altMarkEnd);
                        window.performance.mark(MezzuriteConstants.vltMarkStart);
                        PerformanceTimingService.measure(MezzuriteReactUtils.getName(MezzuriteConstants.altName, MezzuriteReactUtils.makeId()), 0, MezzuriteConstants.altMarkEnd);
                    }
                    else{
                        window.performance.mark(MezzuriteConstants.vltMarkStart);
                    }
                }
            }   
            window.mezzurite.routeUrl = props.location.pathname;
        return <WrappedComponent {...props} />
     })
}

export {withMezzuriteRouter};