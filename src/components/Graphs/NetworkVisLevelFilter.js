import { useContext, useEffect, useState } from 'react';
import { SubjectContext } from '../../context/subject-context';
import Dropdown from '../Buttons/Dropdown';

const NetworkVisLevelFilter = () => {
  const ctx = useContext(SubjectContext);
  const { levelFilters, levels } = ctx;
  const [checkedLevels, setCheckedLevels] = useState([]);

  useEffect(() => {
    if (levels) {
      setCheckedLevels(new Array(levels.length + 1).fill(false));
    }
  }, [levels]);

  const handleFilterCheck = (e) => {
    let level = 0;
    try {
      level = parseInt(e.target.id.slice(-1));
    } catch (error) {
      return;
    }
    if (Number.isNaN(level)) return;
    console.log(level);
    let checked = checkedLevels;
    if (levelFilters.includes(level)) {
      ctx.removeLevelFilter(level);
      checked[level] = false;
    } else {
      ctx.addLevelFilter(level);
      checked[level] = true;
    }
    setCheckedLevels(checked);
  };

  const handleFilterCheckClean = () => {
    setCheckedLevels(new Array(levels.length + 1).fill(false));
    ctx.cleanLevelFilters();
  };

  return (
    <Dropdown title={'Períodos'}>
      {levels &&
        levels.map((level) => {
          return (
            <div
              className='dropdown-item'
              onClick={handleFilterCheck}
              key={`checkPeriodContainer${level}`}
            >
              <div className='form-check' id={`${level}`}>
                <input
                  className='form-check-input'
                  type='checkbox'
                  value=''
                  id={`checkPeriod${level}`}
                  checked={checkedLevels[level]}
                />
                <label
                  className='form-check-label'
                  htmlFor={`checkPeriod${level}`}
                >
                  {level}
                </label>
              </div>
            </div>
          );
        })}
      <div className='dropdown-item' onClick={handleFilterCheck}>
        <button
          onClick={handleFilterCheckClean}
          className='btn btn-secondary btn-icon-split'
        >
          <span className='text'>Limpar</span>
        </button>
      </div>
    </Dropdown>
  );
};

export default NetworkVisLevelFilter;
