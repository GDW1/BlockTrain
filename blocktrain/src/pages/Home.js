import './Home.css';
import Header from '../components/Header.jsx'
import Display from '../components/Display.jsx'
import InputBox from '../components/InputBox';

function Home() {
    return (
        <div className="Home">
            <Header/>
            <Display/>
            <InputBox/>
        </div>
    );
}

export default Home;
