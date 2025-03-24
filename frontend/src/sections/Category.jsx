import CategoryCards from '../components/CategoryCards';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';

const Category = () => {
  const { Services } = useContext(AppContext);
  
    return (
        <>
            <div className="category-section">
              <h2>Find By Categories</h2>
              <p> Browse through our categories to find expert home services tailored to your needs.</p>
                <div className='category-lists'>
                    {Services.map((service, index) => (
                        <CategoryCards key={index} {...service} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Category