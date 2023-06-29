import { useDisclosure } from '@mantine/hooks';
import { Modal, useMantineTheme } from '@mantine/core';
 import Postshare from '../Postshare/Postshare';
function ShareModal({ modalopened, setmodelopened }) {
    const [opened, { open, close }] = useDisclosure(false);
    const theme = useMantineTheme();

    return (
        <>
            <Modal
                opened={modalopened}
                onClose={() => setmodelopened(false)}
             size='45%'
            
                overlayProps={{
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                    opacity: 0.55,
                    blur: 3,
                }}

            >
                <Postshare/>
            </Modal>


        </>
    );
}

export default  ShareModal;