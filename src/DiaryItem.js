import React, { useState, useRef, useEffect } from "react";

const DiaryItem = ({
    onEdit, onRemove, author, content, emotion, created_date, id
}) => {
    useEffect(() => {
        console.log(`${id}번째 아이템 랜더!`);
        
    });


    const [isEdit, setIsEdit] = useState(false);
    const toggleIsEdit = () => setIsEdit(!isEdit);

    const [localContent, setLocalContent] = useState(content);
    const localContentInput = useRef();
    const handleRemove = () => {
        if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
            onRemove(id);
        }
    }
    const handleQuitEdit = () => {
        setIsEdit(false);
        setLocalContent(content);
    }
    const handleEdit = () => {
        if (localContent.length < 5) {
            localContentInput.current.focus();
            return;
        }
        if (window.confirm(`${id}번째 일기를 수정하겠습니까?`)) {
            onEdit(id, localContent);
            toggleIsEdit();
        }
        
    }

    return (
        <div className="DiaryItem">
            <div className="info">
                {/* it.id 또는 idx : 삭제,추가로 idx 순서가 바뀌면 문제가 생길수 있으므로 고유한 아이디가 있다면, 고유한 id로 키를 지정한다. */}

                <span>
                    작성자 : {author} | 감정점수 : {emotion}
                </span>
                <br />
                <span className="date">{new Date(created_date).toLocaleString()}</span>
            </div>

            <div className="content">
                {isEdit ? (
                    <> <textarea
                        ref={localContentInput}
                        value={localContent}
                        onChange={(e) => {
                            setLocalContent(e.target.value)
                        }} />
                </> ) : (
                        <>{content}</>
                    )}
            </div>
            {isEdit ? (
                <>
                    <button onClick={handleQuitEdit}>수정취소</button>
                    <button onClick={handleEdit}>수정완료</button>
                </>
            ) : (
                <>
                    <button onClick={handleRemove}>삭제하기</button>
                    <button onClick={toggleIsEdit}>수정하기</button>            
                </>
            )}
            
        </div>
    );
};

export default React.memo(DiaryItem);