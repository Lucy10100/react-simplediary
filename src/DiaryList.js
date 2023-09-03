import DiaryItem from './DiaryItem.js'

const DiaryList = ({ onEdit, onRemove, diaryDummyList }) => {
    return (<div className="DiaryList">
        <h2>일기 리스트</h2>
        <h4>{diaryDummyList.length}개의 일기가 있습니다.</h4>
        <div>
            {diaryDummyList.map((it, idx) => (
                <DiaryItem key={it.id} {...it} onEdit={ onEdit } onRemove={onRemove} />
                // ...(스프레드) 연산자 : it 이라는 객체 안에 들어있는 모든 prop 이 전달됨
            ))}
        </div>
    </div>
    );
};
DiaryList.defaultProps = {
    diaryDummyList: [],
}
export default DiaryList;