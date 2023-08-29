// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    vaccinationDetails: {},
    ageWiseVaccination: [],
    genderWiseVaccination: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      const formattedLast7daysVaccination = updatedData.last7DaysVaccination.map(
        each => ({
          vaccineDate: each.vaccine_date,
          dose1: each.dose_1,
          dose2: each.dose_2,
        }),
      )
      this.setState({
        vaccinationDetails: formattedLast7daysVaccination,
        ageWiseVaccination: updatedData.vaccinationByAge,
        genderWiseVaccination: updatedData.vaccinationByGender,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {
      vaccinationDetails,
      genderWiseVaccination,
      ageWiseVaccination,
    } = this.state
    return (
      <>
        {<VaccinationCoverage vaccinationInLast7Days={vaccinationDetails} />}
        {<VaccinationByGender genderVaccination={genderWiseVaccination} />}
        {<VaccinationByAge ageVaccination={ageWiseVaccination} />}
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFinalView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="app-container">
          <div className="header-container">
            <img
              className="header-logo"
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
            />
            <h1 className="website-name">Co-WIN</h1>
          </div>
          <h1 className="main-heading">CoWIN Vaccination in India</h1>
          {this.renderFinalView()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
