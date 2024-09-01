import { useDispatch } from 'react-redux';
import styles from './FilterForm.module.css'
import { filterUsers, setSelectedOption } from '../Store/userDownload';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/userStore';
import { User } from '../type';

export default function Filter() {
  const options = useSelector((state: RootState) => state.options);
  const selectedOption = useSelector((state: RootState) => state.users.selectedOption);
  const dispatch = useDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterUsers({ searchTerm: e.target.value, column: selectedOption }));
  };
  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedOption(e.target.value as keyof User));
  };
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search..."
        className={styles.searchInput}
        onChange={handleChange}
      />
      <select className={styles.filterSelect} onChange={handleOptionChange}>
        {options.map((option, index) => (
          <option key={index} value={option} className={styles.eachOption}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )

}