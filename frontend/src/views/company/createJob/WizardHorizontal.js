// ** React Imports
import { useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'

// ** Steps
import Address from './steps-with-validation/Address'
import SocialLinks from './steps-with-validation/SocialLinks'
import PersonalInfo from './steps-with-validation/PersonalInfo'
import AccountDetails from './steps-with-validation/AccountDetails'

const WizardHorizontal = () => {
  // ** Ref
  const ref = useRef(null)

  // ** State
  const [stepper, setStepper] = useState(null)

  const steps = [
    {
      id: 'account-details',
      title: 'Job Title',
      subtitle: 'Enter Job Title',
      content: <AccountDetails stepper={stepper} />
    },
    // {
    //   id: 'personal-info',
    //   title: 'Skills',
    //   subtitle: 'Provide Skills',
    //   content: <PersonalInfo stepper={stepper} />
    // },
    {
      id: 'step-address',
      title: 'Education',
      subtitle: 'Add Education',
      content: <Address stepper={stepper} />
    },
    {
      id: 'social-links',
      title: 'Job Description',
      subtitle: 'Job Description Required',
      content: <SocialLinks stepper={stepper} />
    }
  ]

  return (
    <div className='horizontal-wizard'>
      <Wizard instance={el => setStepper(el)} ref={ref} steps={steps} />
    </div>
  )
}

export default WizardHorizontal
