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
		<header className='shadow bg-gray-500'>
			<Container>
				<nav className='flex items-center'>
					<div className='mr-4'>
						<Link to={"/"}>
							<Logo width='150px'/>
						</Link>
					</div>
					<ul className='flex flex-wrap justify-between items-center gap-2 ml-auto'>
					{	
						navItems.map((item) => (
							item.active? <li key={item.name} className='px-2'>
								<button onClick={() => navigate(item.url)} className='cursor-pointer'>
									{item.name}
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
