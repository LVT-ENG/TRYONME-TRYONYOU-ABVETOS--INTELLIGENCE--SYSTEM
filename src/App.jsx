import React from 'react';
import HeroSection from './HeroSection';
import ClaimsCarrousel from './ClaimsCarrousel';
import StationTPage from './StationTPage';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
export default function App(){return(<Router><Routes><Route path='/' element={<><HeroSection/><ClaimsCarrousel/></>}/><Route path='/station-t' element={<StationTPage/>}/></Routes></Router>)}