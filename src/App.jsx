import './App.css'
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from "./appwrite/auth"
import {login,logout} from './store/authSlicer'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';

function App() {

	const [loading, setLoading] = useState(true)
	const dispatch = useDispatch()

	useEffect(() => {
		authService.getCurrentUser()
		.then((userData) => {
			if(userData){
				dispatch(login({userData}))
			}
			else{
				dispatch(logout())
			}
		})
		.catch((error) => {
			console.log("Auth useEffect Error: " ,error);
			
		})
		.finally(()=>{
			setLoading(false);
		})
	}, [])


	return !loading ? 
		<div className='min-h-screen w-full bg-gray-600 flex flex-wrap content-between'>
			<div className='w-full block'>
				<Header/>
				<main>
					<Outlet/>
				</main>
				<Footer/>
			</div>
		</div> 
		:
		<div>Loading</div>
}

export default App
