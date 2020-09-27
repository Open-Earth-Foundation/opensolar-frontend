import React, { useState } from "react";
import Placeholder from "../../../../assets/images/solars.png";
import iconWatch from "../../../../assets/images/ic-watch.svg";
import IconGps from "../../../../assets/images/ic-location-min.svg";
import AvatarPlaceholder from "../../../../assets/images/avatarplaceholder.png";
import ProgressBar from "./ProgressBar";
import DetailContainer from "./DetailContainer";
import IconBenef from "../../../../assets/images/ic-beneficiary.svg";
import IconDeveloper from "../../../../assets/images/ic-developer.svg";
import IconTools from "../../../../assets/images/ic-tools.svg";
import IconContractor from "../../../../assets/images/ic-contractor.svg";
import IconCalendar from "../../../../assets/images/ic-calendar.svg";
import DocumentationContainer from "../../../General/DocumentationContainer/DocumentationContainer";
import ROUTES from "../../../../routes/routes";

const ReceiverProject = ({ data }) => {
  const project = { ...data };
  const [dropdown, setDropdown] = useState(false);

  return (
    <div>
      <div className="projects-section">
        <div className="container">
          <div className="row no-gutters">
            <div className="col-lg-7 media-right">
              <img src={Placeholder} alt="placeholder" />
            </div>
            <div className="col-lg-5 media-left">
              <button className="watch-button">
                <img src={iconWatch} alt="watch-icon" />
              </button>
              <h5>SOLAR ONLY</h5>
              <h3 className="title-primary">
                {project["Explore Tab"]["name"]}
              </h3>
              <h6>
                <img src={IconGps} alt="icon-gps" />
                <a
                  href="https://goo.gl/maps/d66egUG3GfsZCtpe6"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project["Explore Tab"]["location"]}
                </a>
              </h6>
              <div className="flexbox">
                <p>{project["Explore Tab"]["project type"]}</p>
              </div>
              <p>
                {project["Explore Tab"] && project["Explore Tab"].description}
              </p>
              <ul>
                <li>
                  {project["Explore Tab"] && project["Explore Tab"]["bullet 1"]}
                </li>
                <li>
                  {project["Explore Tab"] && project["Explore Tab"]["bullet 2"]}
                </li>
                <li>
                  {project["Explore Tab"] && project["Explore Tab"]["bullet 3"]}
                </li>
              </ul>
              <h4 className="owner">PROJECT ORIGINATOR</h4>
              <div className="flexbox -alt">
                <img src={AvatarPlaceholder} alt="placeholder" />
                <h4>
                  {project["Explore Tab"] &&
                    project["Explore Tab"]["originator name"]}
                </h4>
              </div>
              <div className="progress-bar-container">
                <div className="flexbox -no-spacing">
                  <p className="progress-donated">
                    $ {project["Explore Tab"]["money raised"]} funded
                  </p>
                  <p className="progress-total">
                    US ${project["Explore Tab"]["total value"]}
                  </p>
                </div>
                <ProgressBar percentage={100} />
              </div>
              <div className="stats">
                <div className="stat-container">
                  <h6>
                    {project["Explore Tab"] && project["Explore Tab"]["solar"]}
                  </h6>
                  <p>SOLAR</p>
                </div>
                <div className="stat-container">
                  <h6>
                    {project["Explore Tab"] &&
                      project["Explore Tab"]["battery"]}
                  </h6>
                  <p>BATTERY</p>
                </div>
                <div className="stat-container">
                  <h6>
                    {project["Explore Tab"] && project["Explore Tab"]["return"]}
                  </h6>
                  <p>RETURN</p>
                </div>
                <div className="stat-container">
                  <h6>
                    {project["Explore Tab"] && project["Explore Tab"]["rating"]}
                  </h6>
                  <p>RATING</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {dropdown && (
        <div className="dropdown-wrapper">
          <div className="details-container">
            <h3 className="title-primary desc">PROJECT DETAILS</h3>
            <div className="container">
              <h4 className="section-title">Role</h4>
              <DetailContainer icon={IconBenef} title={project.Role} />
              <button className="see-more">SEE ALL PARTIES INVOLVED ></button>
              <h4 className="section-title">Project Stage & Actions</h4>
              <DetailContainer
                icon={IconDeveloper}
                title={project["Project Stage & Actions"].Stage}
              />
              <DetailContainer
                icon={IconTools}
                title={"Contractor Actions"}
                action={"No pending action"}
              />
              <button className="see-more">
                <a href="#/">SEE PROJECT DEVELOPMENT TIMELINE ></a>
              </button>
              <h4 className="section-title">Project Wallets</h4>
              <DetailContainer
                icon={IconContractor}
                title={
                  (project["ProjectWallets"].Certificates &&
                    project["ProjectWallets"].Certificates[0][0]) ||
                  (project["ProjectWallets"]["Project Wallets"] &&
                    project["ProjectWallets"][["Project Wallets"]][0][0])
                }
                action={
                  (project["ProjectWallets"].Certificates &&
                    project["ProjectWallets"].Certificates[0][1]) ||
                  (project["ProjectWallets"]["Project Wallets"] &&
                    project["ProjectWallets"][["Project Wallets"]][0][1])
                }
                actionLink="https://swytch.io"
              />
              {/*<DetailContainer*/}
              {/*    icon={IconWallet}*/}
              {/*    title={"Carbon & Climate Certificates (****" + project.U.SecondaryWallet.PublicKey.slice(-5) + ")"}*/}
              {/*    titleLink={'#'}*/}
              {/*    action={'0'}*/}
              {/*    actionLink={"https://testnet.steexp.com/account/" + project.U.SecondaryWallet.PublicKey}*/}
              {/*/>*/}
              {/*<DetailContainer*/}
              {/*    icon={IconContractor}*/}
              {/*    title={"Carbon & Climate Certificates (****" + project.U.StellarWallet.PublicKey.slice(-5) + ")"}*/}
              {/*    titleLink={"https://ropsten.etherscan.io/address/" + project.U.StellarWallet.PublicKey}*/}
              {/*    action={'0'}*/}
              {/*    actionLink="https://swytch.io"*/}
              {/*/>*/}
              <button className="see-more">
                <a href={ROUTES.PROFILE_PAGES.SETTINGS_PAGES.ACCOUNT}>
                  GO TO PROFILE AND WALLET SETUP >
                </a>
              </button>
              <h4 className="section-title">`Pending Bill `Information</h4>
                <div>
                <DetailContainer
                  icon={IconCalendar}
                  title={
                    project["BillsRewards"] && project["BillsRewards"].Payments
                      ? project["BillsRewards"].Payments[0]
                      : ""
                  }
                  action={
                    project["BillsRewards"] && project["BillsRewards"].Payments
                      ? project["BillsRewards"].Payments[1]
                      : ""
                  }
                />
                <DetailContainer
                  icon={IconCalendar}
                  title={
                    project["BillsRewards"] && project["BillsRewards"].Payments
                      ? project["BillsRewards"].Payments[2]
                      : ""
                  }
                  action={
                    project["BillsRewards"] && project["BillsRewards"].Payments
                      ? project["BillsRewards"].Payments[3]
                      : ""
                  }
                />
                <DetailContainer
                  icon={IconCalendar}
                  title={
                    project["BillsRewards"] && project["BillsRewards"].Payments
                      ? project["BillsRewards"].Payments[4]
                      : ""
                  }
                  action={
                    project["BillsRewards"] && project["BillsRewards"].Payments
                      ? project["BillsRewards"].Payments[5]
                      : ""
                  }
                />
                </div>
              <button className="see-more">
                <a href="#/" target="_blank" rel="noopener noreferrer">
                  SEE PAST PAYMENTS >
                </a>
              </button>
              <h4 className="section-title">Teller Details</h4>
              <div>
                <DetailContainer
                  icon={IconCalendar}
                  title="Broker URL"
                  action="mqtt.openx.solar"
                />
                <DetailContainer
                  icon={IconCalendar}
                  title="Teller Data"
                  action="Download local data"
                  actionLink="https://api.openx.solar/user/tellerfile"
                />
              </div>
              <button className="see-more">
                <a href="#/" target="_blank" rel="noopener noreferrer">
                  SEE PAST PAYMENTS >
                </a>
              </button>
            </div>
          </div>
          <div className="contracts-container">
            <div className="container">
              <h3 className="title-primary desc">
                DOCUMENTATION AND SMART CONTRACTS
              </h3>
              <DocumentationContainer documents={[]} />
            </div>
          </div>
        </div>
      )}
      <button className="display-button" onClick={() => setDropdown(!dropdown)}>
        {dropdown ? "SHOW LESS" : "SHOW MORE"}
      </button>
    </div>
  );
};

export default ReceiverProject;
