import Categories from './Categories'
import Header from './Header'
// import JobCards from './JobCards'
import LatestJobs from './LatestJobs'
import Navbar from './Navbar'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () => {

  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigate("/admin/companies");
    }
  }, []);

  useGetAllJobs();
  return (
    <div>
      <Navbar />
      <Header />
      <Categories />
      <LatestJobs  />
      {/* <JobCards/> */}
      <Footer />
    </div>
  )
}

export default Home