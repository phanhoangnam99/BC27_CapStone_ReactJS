import styled from "styled-components";
import { AiFillPlayCircle } from "react-icons/ai";

export default function Featured() {
  return (
    <Option>
      <div className="buttons">
        <button className="play">
          <AiFillPlayCircle /> Play
        </button>
      </div>
    </Option>
  );
}

const Option = styled.div`
  .buttons {
   .play{
    padding: 10px 20px ;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 500;
    font-size: 30px;
   }
  }
`;
