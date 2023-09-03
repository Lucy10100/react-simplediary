import React, { useState, useEffect } from 'react';


// const TextView = React.memo(({ text }) => {
//     useEffect(() => {
//         console.log(`Update :: Text : ${text}`);
//     })
//     return <div>{text}</div>
// });


// const CountView = React.memo(({ count }) => {
//     useEffect(() => {
//         console.log(`Update :: Count : ${count}`);
//     });
//     return <div>{count}</div>
// });



const CounterA = React.memo(({ count }) => {
    useEffect(() => {
        console.log(`CounterA :: ${count}`);
    })
    return <div>{count}</div>
})

const CounterB = ({ obj }) => {
    useEffect(() => {
        console.log(`CounterB :: ${obj.count}`);
    });
    return <div>{obj.count}</div>
}

const areEqual = (prevProps, nextProps) => {
    return prevProps.obj.count === nextProps.obj.count;

    // return true => 리렌더링을 일으키지 않음
    // return false => 리렌더링을 일으킴 
}

const MemoizedCounterB = React.memo(CounterB, areEqual);


const OptimizeTest = () => {

    // const [count, setCount] = useState(1);
    // const [text, setText] = useState("");


    // return <div style={{ padding: 50 }}>
    //     <div>
    //         <h2>count</h2>
    //         <CountView count={count} />
    //         <button onClick={() => setCount(count + 1)}>+</button>ß
    //     <div>
    //         <h2>text</h2>
    //         <TextView text={text} />
    //         <input value={text} onChange={(e) => setText(e.target.value)} />
    //     </div>

    // </div>;

    const [count, setCount] = useState(1);
    const [obj, setObj] = useState({
        count: 1,
    });
    return (
        <div style={{ padding: 50 }}>
            <div>
                <h2>Counter A</h2>
                <CounterA count={count} />
                <button onClick={() => setCount(count)}> A button </button>
            </div>
            <div>
                <h2>Counter B</h2>
                <MemoizedCounterB obj={obj} />
                <button onClick={() => setObj({ count: obj.count })}> B button </button>
            </div>

        </div>
    );
}

export default OptimizeTest;