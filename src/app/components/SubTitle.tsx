import React from 'react';

const SubTitle = ({text}: {text: string}) => {
    return (
        <h3
            className="
    text-2xl
    relative
    mb-2
    after:content-['']
    after:block
    after:w-[100px]
    after:h-[3px]
    after:bg-[var(--accent-color)]
    after:absolute
  "
            style={{color: 'var(--accent-color)', fontFamily: 'var(--font-text)'}}
        >
            {text}
        </h3>
    );
};

export default SubTitle;