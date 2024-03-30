import { ChangeEvent, SyntheticEvent, useState, useEffect} from 'react';
import './App.css';
import CardList from './Components/CardsList/CardList';
import Search from './Components/Search/Search';
import { CompanySearch } from './company';
import { searchCompanies } from './api';
import ListPortfolio from './Components/Portfolio/ListPortfolio/ListPortfolio';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';

function App() {
  const [search,setSearch] = useState<string>('');
  const [searchResults, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>('');
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
  useEffect(() => {
    console.log('search value: ', search);
  }, [search]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.trim());
  }

  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    const portfolioAlreadyExists = portfolioValues.includes(e.target[0].value);
    if (portfolioAlreadyExists) {
      console.log('Portfolio already exists');
      return;
    }
    const updatedPortfolio = [...portfolioValues, e.target[0].value]
    setPortfolioValues(updatedPortfolio);
  }

  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    const removed = portfolioValues.filter((value) => {
      return value !== e.target[0].value;
    })
    setPortfolioValues(removed);
  }

  const handleSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log('Form submitted');
    console.log('Search value on submit: ', search);
  
    try {
      const result = await searchCompanies(search);
      console.log('API result:', result);

      if (typeof result === 'string') {
        setServerError(result);
        console.log('Server error:', serverError);
      } else if (Array.isArray(result.data)) {
        setSearchResult(result.data);
        console.log('Search result:', result.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setServerError('An error occurred while fetching data.');
    } finally {
      console.log(searchResults);
    }
  }
  
  return (
    <>
      <Navbar /> 
      <Search onSearchSubmit={handleSearchSubmit} search={search} handleSearchChange={handleSearchChange} />
      {serverError && <p>{serverError}</p>}
      <ListPortfolio portfolioValues={portfolioValues} onPortfolioDelete={onPortfolioDelete} />
      <CardList searchResults={searchResults} onPortfolioCreate={onPortfolioCreate}/> 
    </>
  );
}

export default App;