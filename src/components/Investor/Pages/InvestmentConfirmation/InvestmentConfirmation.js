import React, { Component } from "react";
import ProjectInfo from "./ProjectInfo/ProjectInfo";
import StepsForm from "../../../General/StepsForm/StepsForm";
import AmountTab from "./AmountTab/AmountTab";
import "./InvestmentConfirmation.scss";
import ProfileTab from "./ProfileTab/ProfileTab";
import ConfirmTab from "./ConfirmTab/ConfirmTab";
import { fetchProject } from "../../../Explore/SingleProject/store/actions";
import connect from "react-redux/es/connect/connect";
import PageLoading from "../../../General/Loading/Loading";
import { Http } from "../../../../services/Http";
import { withSnackbar } from "notistack";
import ROUTES from "../../../../routes/routes";
import axios from "axios";
import { validateAction } from "../../../Profile/store/actions";
import Storage from "../../../../services/Storage";
import NotAvailable from "../../../UI/NotAvailable/NotAvailable";
import ConfirmModal from "../../../UI/ConfirmModal/ConfirmModal";
import Input from "../../../UI/SolarForms/Input/InputSimple";

class InvestmentConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      investmentAmount: 0,
      agreeTerms: false,
      brokeDeal: false,
      investCategory: false,
      balance: 10000,
      open: false,
      seedpwd: ""
    };
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
    this.props.fetchProject(this.props.match.params.id);
    this.props.fetchInvestor("investor", Storage.get("username"));
  };

  componentDidUpdate = prevProps => {
    if (
      this.props.project.isLoading !== prevProps.project.isLoading ||
      this.props.investor.isLoading !== prevProps.investor.isLoading
    ) {
      if (this.props.investor.items && this.props.investor.items.U) {
        axios
          .get(
            `https://api2.openx.solar/user/balance/asset?username=${
              this.props.investor.items.U.Username
            }&token=${Storage.get("token")}&asset=STABLEUSD`
          )
          .then(res => {
            const balance = res.data;
            this.setState({
              balance: Number(balance)
            });
          });
      }

      this.setState({
        investor: this.props.investor.items,
        loading: this.props.project.isLoading || this.props.investor.isLoading,
        project: this.props.project.items
      });
    }
  };

  handleInvestmentChange = el => {
    this.setState({
      investmentAmount: Number(el.target.value)
    });
  };

  handleConfirm = () => {
    Http.investorInvest(
      this.props.match.params.id,
      this.state.investmentAmount,
      this.state.seedpwd
    ).subscribe(
      () => {
        this.props.enqueueSnackbar("Transaction completed!", {
          variant: "success",
          autoHideDuration: 3000
        });
      },
      error =>
        this.props.enqueueSnackbar("Transaction failed!", {
          variant: "error",
          autoHideDuration: 3000
        })
    );
    this.props.enqueueSnackbar(
      "Transaction is being sent. Please allow up to 30 seconds for a confirmation.",
      {
        variant: "warning",
        autoHideDuration: 3000
      }
    );
    this.props.history.push(ROUTES.INVESTOR_PAGES.DASHBOARD);
  };

  handleToggleChange = key => {
    this.setState(prevState => ({
      [key]: !prevState[key]
    }));
  };

  validateForm = value => {
    return !(
      value > this.state.balance ||
      value < 100 ||
      value > this.state.project["SeedInvestmentCap"] ||
      value > this.state.project.TotalValue - this.state.project.MoneyRaised
    );
  };

  setSeedpwd = value => {
    this.setState({
      seedpwd: value
    });
  };

  render() {
    const { investor, loading, project, balance, open, seedpwd } = this.state;
    const { isInvestor } = this.props;

    return (
      <div className="investment-confirmation">
        {!project || loading ? (
          <PageLoading />
        ) : (
          <>
            {open && (
              <ConfirmModal
                title="Enter seed password"
                onConfirm={this.handleConfirm}
                onCancel={() => this.setState({ open: false })}
                body={
                  <Input
                    placeholder="Seed Password"
                    type="password"
                    value={seedpwd}
                    onChange={e => this.setSeedpwd(e.target.value)}
                  />
                }
              />
            )}
            <div className="d-flex justify-content-center">
              <ProjectInfo project={project} />
            </div>
            <div className="">
              {!isInvestor ? (
                <NotAvailable
                  text={"You have to be an Investor to invest in project"}
                />
              ) : (
                <StepsForm
                  name="confirm"
                  tabs={[
                    { name: "amount", key: 1 },
                    { name: "profile", key: 2 },
                    { name: "confirm", key: 3 }
                  ]}
                  separator={false}
                  classes={["bigger-fonts"]}
                  saveText="confirm"
                  handleSave={() => this.setState({ open: true })}
                  disabledNext={!this.validateForm(this.state.investmentAmount)}
                  disabledConfirm={!this.state.agreeTerms}
                >
                  <AmountTab
                    key={1}
                    handleChange={this.handleInvestmentChange}
                    investmentValue={this.state.investmentAmount}
                    project={project}
                    account={investor.U}
                    usdbalance={balance}
                  />
                  <ProfileTab
                    key={2}
                    investmentValue={this.state.investmentAmount}
                    account={investor.U}
                    brokeDeal={this.state.brokeDeal}
                    investCategory={this.state.investCategory}
                    handleToggle={this.handleToggleChange}
                    usdbalance={balance}
                  />
                  <ConfirmTab
                    key={3}
                    investmentValue={this.state.investmentAmount}
                    data={project}
                    loading={loading || project.length === 0}
                    handleToggle={this.handleToggleChange}
                    agreeTerms={this.state.agreeTerms}
                    account={investor.U}
                    usdbalance={balance}
                  />
                </StepsForm>
              )}
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isInvestor: state.profile.investor.authorized,
  isRecipient: state.profile.recipient.authorized,
  isDeveloper: state.profile.entity.items.Developer,
  project: state.project,
  profile: state.profile.user.items,
  investor: state.profile.investor
});

const mapDispatchToProps = dispatch => ({
  fetchInvestor: (entity, username) =>
    dispatch(validateAction(entity, username)),
  fetchProject: id => dispatch(fetchProject(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(InvestmentConfirmation));
