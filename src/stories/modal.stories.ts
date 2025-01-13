import { Meta, StoryFn } from '@storybook/angular';
import { ModalComponent } from '../app/shared/modal/modal.component';

export default {
  title: 'Example/Modal',
  component: ModalComponent,
  argTypes: {
    cancelEvent: { action: 'cancelEvent' },
    confirmEvent: { action: 'confirmEvent' },
  },
} as Meta;

const Template: StoryFn<ModalComponent> = (args) => ({
  component: ModalComponent,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  title: 'Confirm Action',
  content: 'Are you sure you want to proceed?',
  cancelBtnText: 'Cancel',
  confirmBtnText: 'Confirm',
};
