import React from 'react';
import HeroSection from './components/HeroSection';
import ClaimsCarrousel from './components/ClaimsCarrousel';
import StationTPage from './pages/StationTPage';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
export default function App(){return(<Router><Routes><Route path='/' element={<><HeroSection/><ClaimsCarrousel/></>}/><Route path='/station-t' element={<StationTPage/>}/></Routes></Router>)}