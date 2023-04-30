import { useCallback, useEffect, useState } from 'react'
import { Dialog } from '@primer/react/drafts'
import { Button, Text } from '@primer/react'
import { useParams } from 'react-router-dom'

import { DONATION_LINKS, DONATION_TEXT_COFFE } from '../../constants'

import * as Styles from './styles'

export const DonationModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [chartCounter, setChartCounter] = useState(0)
  const { chartId } = useParams();

  const openDialog = useCallback(() => setIsOpen(true), [setIsOpen])
  const closeDialog = useCallback(() => setIsOpen(false), [setIsOpen])

  const disableModal = () => {
    sessionStorage.setItem('disableDonationModal', 'true');
  }

  const isModalDisabled = () => {
    return sessionStorage.getItem('disableDonationModal') === 'true';
  }

  useEffect(() => {
    if (isModalDisabled()) return;

    if (chartCounter === 3){
      openDialog();
      setChartCounter(0);
    } else {
      setChartCounter(chartCounter + 1);
    }
  }, [chartId])

  return (
    <>
      <Button onClick={openDialog}>Open</Button>
      {isOpen && (
        <Dialog
          title={DONATION_TEXT_COFFE}
          footerButtons={[
            {
              content: 'No, thanks!',
              onClick: closeDialog
            },
            {
              content: 'Already donated!',
              buttonType: 'primary',
              onClick: () => {
                closeDialog();
                disableModal();
              },
            }
          ]}
          onClose={closeDialog}
        >
          <Styles.DonationCards>
            {
              DONATION_LINKS.map((item) => (
                <Styles.DonationCard key={item.value} href={item.link} target="_blank">
                  <Text>{ item.value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) }</Text>
                </Styles.DonationCard>
              ))
            }
          </Styles.DonationCards>
        </Dialog>
      )}
    </>
  )
}