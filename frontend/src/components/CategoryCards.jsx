import { useNavigate } from "react-router-dom";

const CategoryCard = ({ image, title, description }) => {
  const navigate = useNavigate();
    return (
      <div className="category-card">
        <img src={image} alt={title} className="category-image" />
        <div className="category-content">
          <h3>{title}</h3>
          <p>{description}</p>
          <button onClick={()=>navigate(`/Services/${title}`)} className="category-button">Explore</button>
        </div>
      </div>
    );
  };
  
  export default CategoryCard;