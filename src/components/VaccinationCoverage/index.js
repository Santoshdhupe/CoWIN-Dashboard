// Write your code here
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {vaccinationInLast7Days} = props
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  return (
    <div className="vaccination-coverage-container">
      <h1 className="vaccination-coverage-heading">Vaccination Coverage</h1>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={vaccinationInLast7Days} margin={{top: 5}}>
          <XAxis
            dataKey="vaccineDate"
            tick={{stroke: 'grey', strokeWidth: 1}}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: 'gray',
              strokeWidth: 0,
            }}
          />
          <Legend wrapperStyle={{padding: 30}} />
          <Bar dataKey="dose1" name="Dose 1" fill="#1f77b4" barSize="20%" />
          <Bar dataKey="dose2" name="Dose 2" fill="#f54394" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
