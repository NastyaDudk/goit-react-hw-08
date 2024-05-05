import { Link } from "react-router-dom";
import {  Text } from '@chakra-ui/react';
import css from "./HomePage.module.css";

const HomePage = () => {
  return (
 


      <div className={css.homeContainer}>
        <div className={css.homeParagraf}>
          <Text
            height="100%"
            width="100%"
            textAlign="center"
            margin="15px"
            fontWeight="bold"
            color="#008000"
            fontSize="24px"
          >
           Welcome to your PhoneBook 👋
          </Text>
          <Link className={css.link} to="/register">
            Register
          </Link>
        </div>

        <div className={css.homeParagraf}>
          <p>Already registered?</p>
          <Link className={css.link} to="/login">
            Login
          </Link>
        </div>
      </div>

  );
};

export default HomePage;