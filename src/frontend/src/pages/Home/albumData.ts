import wuFranklin from '../../images/franklin-benzi.jpg';
import linusWu from '../../images/linus-wu.png';
import lucyKillerTape from '../../images/lucy-killer-tape.jpg';
import linusShorty from '../../images/linus-shorty.jpg';
import wutangJoint from '../../images/wu-tang-joint.png';
import wutangAgain from '../../images/wu-tang-again.png';

const getRandomSet = (arr, numItems) => {
    // Step 1: Shuffle the array
    const shuffledArray = arr.sort(() => Math.random() - 0.5);
  
    // Step 2: Select the first 'numItems' from the shuffled array
    return shuffledArray.slice(0, numItems);
  };

  const visuals = [
    {
      img: wuFranklin,
      title: "Wu Franklin",
    },
    {
      img: linusWu,
      title: "Linus Wu",
    },
    {
      img: lucyKillerTape,
      title: "Lucy Killer Tape",
    },
    {
      img: linusShorty,
      title: "Linus Shorty",
    },
    {
      img: wutangJoint,
      title: "Wu-Tang Joint",
    },
    {
      img: wutangAgain,
      title: "Wu-Tang Again",
    },
  ];

const albumData = [
    {
      id: 1,
      visuals: structuredClone(visuals),
    },
    {
      id: 2,
      visuals: getRandomSet(structuredClone(visuals), 4),
    },
    {
      id: 3,
      visuals: getRandomSet(structuredClone(visuals), 4),
    },
    {
      id: 4,
      visuals: getRandomSet(structuredClone(visuals), 4),
    },
    {
      id: 5,
      visuals: getRandomSet(structuredClone(visuals), 5),
    },
  ];

  export default albumData