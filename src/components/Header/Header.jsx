import React from 'react'
import {Container, Logo, LogoutBtn} from "../index"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Header = () => {

	const authStatus = useSelector(state => state.auth.status)

	const navigate = useNavigate();
	const navItems = [
		{
			name:"Home",
			url:"/",
			active:true
		},
		{
			name:"Login",
			url:"/login",
			active:!authStatus
		},
		{
			name:"Signup",
			url:"/signup",
			active:!authStatus
		},
		{
			name:"All posts",
			url:"/all-posts",
			active:authStatus
		},
		{
			name:"Add post",
			url:"/add-post",
			active:authStatus
		}

	]

	return (
		<header className='py-3 shadow bg-gray-500'>
			<Container>
				<nav className='flex'>
					<div className='mr-4'>
						<Link>
							<Logo width='120px'/>
						</Link>
					</div>
					<ul className='flex ml-auto'>
					{
						navItems.map((item) => (
							item.active? <li key={item.name}>
								<button onClick={() => navigate(item.url)}>
									item.name
								</button>
							</li>: null
						))
					}
					{
						(authStatus && <LogoutBtn/>)
					}
					</ul>
				</nav>
			</Container>
		</header>
	)
}

export default Header
