import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArticleIcon from '@mui/icons-material/Article';
import HomeIcon from '@mui/icons-material/Home';
import '../../../static/css/menu.css'
import { Link } from 'react-router-dom';

const Menu = () => {

    const [menuHidden, setMenuHidden] = React.useState(false)


    const openCloseMenu = (e) => {

        if (menuHidden === false) {
            setMenuHidden(true);
        }else{
            setMenuHidden(false);
        }

    }


    return (
        <>
            <div className='toobar'>
                <div className='toolbar-icon'>
                    <a href="#" onClick={openCloseMenu}><MenuIcon /></a>
                </div>

                <div className={menuHidden ? 'toolbar-title-menu-opened' : 'toolbar-title'}>
                    <h2>CV-Maker</h2>
                </div>
            </div>

            <div className={menuHidden ? 'menu' : 'menu hidden'}>
                <div className='close-menu-button'>
                    <a href="#" onClick={openCloseMenu}><ArrowBackIcon/></a>
                </div>

                <hr />

                <Link 
                    to="/" 
                    className='menu-item'
                    onClick={openCloseMenu}
                    >
                    <HomeIcon />
                    <span>Home</span>
                </Link>

                <Link 
                    to="/resume" 
                    className='menu-item'
                    onClick={openCloseMenu}
                    >
                    <ArticleIcon />
                    <span>Resume</span>
                </Link>

                <Link 
                    to="/templates" 
                    className='menu-item'
                    onClick={openCloseMenu}
                    >
                    <SummarizeIcon />
                    <span>Templeates</span>
                </Link>

            </div>
        </>
    )
}

export default Menu