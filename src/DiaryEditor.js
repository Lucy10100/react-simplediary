import React, { useEffect, useRef, useState } from "react";


const DiaryEditor = ({ onCreate }) => {

    // 돔요소를 선택하는 레퍼런스 객채 - current 현재 돔 가져올 수 있다. 
    const authorInput = useRef();
    const contentInput = useRef();
    const [state, setState] = useState({
        author: "",
        content: "",
        emotion: 1
    });
    // const [author, setAuthor] = useState("");
    // const [content, setContent] = useState("");

    const handleChangeState = (e) => {

        setState({
            ...state,
            [e.target.name]: e.target.value // 괄호 표기법. 자동으로 바꿔줌
        });
    }
    const handleSubmit = () => {
        if (state.author.length < 1) {
            // focus
            authorInput.current.focus();
            return;
        }

        if (state.content.length < 5) {
            // focus
            contentInput.current.focus();
            return;
        }
        onCreate(state.author, state.content, state.emotion);
        console.log(state);
        alert('저장성공');
        setState({
            author: "",
            content: "",
            emotion: 1,
        });
    };

    return (
        <div className="DiaryEditor">
            <h2>오늘의 일기</h2>
            <div>
                <input
                    ref={authorInput}
                    type="text"
                    value={state.author}
                    name="author"
                    onChange={handleChangeState} />
            </div>
            <div>
                <textarea
                    ref={contentInput}
                    type="text"
                    value={state.content}
                    name="content"
                    onChange={handleChangeState} />
            </div>
            <div>
                <span>오늘의 감정 점수 : </span>
                <select
                    name="emotion"
                    value={state.emotion}
                    onChange={handleChangeState}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>
            <div>
                <button onClick={handleSubmit}>일기 저장하기</button>
            </div>
        </div>
    )

}

export default React.memo(DiaryEditor);