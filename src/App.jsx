import './App.css'
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from "./appwrite/auth"
import { login, logout } from './store/authSlicer'
import { Header, Footer, Loader} from './components/index';
import { Outlet, useNavigate } from 'react-router-dom';

function App() {

	const [loading, setLoading] = useState(true)
	const dispatch = useDispatch()
	const navigate = useNavigate();

	useEffect(() => {
		const cookieFallBack = localStorage.getItem("cookieFallback")
		console.log(cookieFallBack);

		if (cookieFallBack?.length > 2) {
			authService.getCurrentUser()
				.then((userData) => {
					if (userData) {
						dispatch(login(userData))
						navigate('/')
					}
					else {
						dispatch(logout())
						navigate("/login")
					}
				})
				.catch((error) => {
					console.log("Auth useEffect Error: ", error);

				})
				.finally(() => {
					setLoading(false);
				})
		}
		else {
			setLoading(false)
		}
	}, [])


	return <div className='min-h-screen w-full bg-gray-400 flex flex-wrap content-between'>
		<div className='w-full block'>
			<Header />
			<main className="min-h-[60vh]">
				{loading ?
					<Loader />
					:
					<Outlet />}
			</main>
			<Footer />
		</div>
	</div>
}

export default App
