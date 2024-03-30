import React, { SyntheticEvent } from 'react';
import Card from '../Cards/Card'
import './CardList.css';
import { CompanySearch } from '../../company';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  searchResults: CompanySearch[];
  onPortfolioCreate: (e: SyntheticEvent) => void;
}

const CardList: React.FC<Props> = ({ searchResults, onPortfolioCreate}: Props): JSX.Element => {
  return (
    <div>
      {searchResults.length > 0 ? (
        searchResults.map((result) => (
          <Card key={uuidv4()} id={result.symbol} searchResult={result} onPortfolioCreate={onPortfolioCreate} />
        ))
      ) : (
        <p className='mb-3 mt-3 text-xl font-semibold text-center md:text-xl'>No results found</p>
      )}
    </div>
  );
}

export default CardList