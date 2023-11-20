import blueinfo from "../assets/icons/stats/blueinfo.svg";
import redinfo from "../assets/icons/stats/redinfo.svg";
import refresh from "../assets/icons/stats/refresh.svg";
import yellowinfo from "../assets/icons/stats/yellowinfo.svg";

const Stats = () => {
  const total = 50;
  const width1 = (25 / total) * 1000;
  const width2 = (24 / total) * 1000;
  const width3 = (1 / total) * 1000;

  return (
    <div className="w-full p-2 h-fit m-3">
      <div className="flex">
        <h5 className="p-1 text-xl font-medium">Password Analysis </h5>
        <img src={refresh} alt="refresh-icon" />
      </div>

      <div className="flex items-center ">
        <div className="flex-row w-60 h-fit m-1">
          <div className="flex">
            {width1 != 0 ? (
              <div
                className="flex p-2 bg-red-500 rounded-l-md h-8 text-center text-xs justify-center items-center text-white font-nunito font-bold"
                style={{ width: `${width1}%` }}
              >
                Weak
              </div>
            ) : null}
            {width2 != 0 ? (
              <div
                className="flex p-2 bg-sky-700 h-8 text-center text-xs justify-center items-center text-white font-nunito font-bold"
                style={{ width: `${width2}%` }}
              >
                Reused
              </div>
            ) : null}
            {width3 != 0 ? (
              <div
                className="flex p-2 bg-yellow-400 rounded-r-md h-8 text-center text-xs justify-center items-center text-white font-nunito font-bold"
                style={{ width: `${width3}%` }}
              >
                Old
              </div>
            ) : null}
          </div>
        </div>
        <div className="analysis-container text-center flex justify-evenly  w-full">
          <div>
            <div className="flex">
              <img src={redinfo} alt="info-icon" className="w-3" />
              <p className="text-xs font-nunito font-bold p-1">
                50 Weak Passwords
              </p>
            </div>
            <p className="text-xs font-nunito font-light">
              You should change this
            </p>
          </div>
          <div>
            <div className="flex">
              <img src={blueinfo} alt="info-icon" className="w-3" />
              <p className="text-xs font-nunito font-bold p-1">
                40 Reused Passwords
              </p>
            </div>
            <p className="text-xs font-nunito font-light">
              Create unique password
            </p>
          </div>
          <div>
            <div className="flex">
              <img src={yellowinfo} alt="info-icon" className="w-3" />
              <p className="text-xs font-nunito font-bold p-1">
                10 Old Passwords
              </p>
            </div>
            <p className="text-xs font-nunito font-light">
              Update your password
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
