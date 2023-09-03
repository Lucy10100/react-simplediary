import React, { useRef, useReducer, useEffect, useMemo, useCallback } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

// const dummyList = [
//   {
//     id: 1,
//     author: "이정환",
//     content: "하이1",
//     emotion: 3,
//     created_date: new Date().getTime() // 현재시간을 기준으로 생성된다. // miliseconds 숫자로 반환 
//   }
// ];

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return action.data; // action.data 를 리턴하면서 state 를 대체한다.
    case 'CREATE': { 
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date
      }
      return [newItem, ...state]; // 원래 배열에 newItem을 추가하는데 맨앞에
    }
    case 'REMOVE':
      return state.filter((it) => it.id !== action.id);
    case 'EDIT':
      return state.map((it) => it.id === action.targetId ? { ...it, content: action.newContent } : it);
    default:
      return state; // 상태변화 없음. 
  }
};
 
const App = () => {
  // const [data, setData] = useState([]);


  const [data, dispatch] = useReducer(reducer, []);
    
  const dataId = useRef(0);

  const getData = async () => {

    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1, // Math.random() * 5 :: 0~4 까지의 랜덤 생성, floor 는 정수로 반환, +1 을 통해 1~5   
        created_date: new Date().getTime(),
        id: dataId.current++
      }
    });
    dispatch({ type: 'INIT', data: initData });
  };

  useEffect(() => {
    getData();

  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({type : 'CREATE', data: {author, content, emotion, id: dataId.current}})
    dataId.current += 1;
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: 'REMOVE', id: targetId });
  },[]);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: 'EDIT', targetId, newContent });
  }, []);
  
  const getDiaryAnalysis = useMemo(
    () => {
      const goodCount = data.filter((it) => it.emotion >= 3).length;
      const badCount = data.length - goodCount;
      const goodRatio = (goodCount / data.length) * 100;
    
      return { goodCount, badCount, goodRatio };
    }, [data.length]
  );

  const {goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="root">
    
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit}  onRemove={onRemove} diaryDummyList={data} />
    </div>                
  );
}

export default App;
