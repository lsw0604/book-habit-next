import styled from 'styled-components';

import ErrorMessage from 'components/common/message/ErrorMessage';
import { customize } from 'style/colors';
import { RadioGroupOptionType } from 'types/style';

interface IProps<T> {
  label?: string;
  value: T;
  onChange: (value: T) => void;
  options: RadioGroupOptionType<T>[];
  isValid?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
  disabled?: boolean;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.2rem 0;
`;

const Wrapper = styled.div`
  display: flex;
  &:after {
    content: ' ';
    clear: both;
  }
`;

const Heading = styled.span`
  margin-left: 10px;
  margin-bottom: 8px;
  display: block;
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 14px;
  line-height: 18px;
`;

const Label = styled.label<{ $isChecked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border: 2px solid
    ${({ $isChecked, theme }) =>
      !$isChecked ? theme.mode.sub : theme.colors.spinner};
  border-radius: 5px;
`;

const Input = styled.input.attrs({ type: 'radio' })`
  width: 0;
  height: 0;
  margin: 0;
  position: relative;
  -webkit-appearance: none;
  outline: none;
`;

const Icon = styled.i`
  width: 1rem;
  height: 1rem;
  svg {
    width: 1rem;
    height: 1rem;
    fill: ${({ theme }) => theme.mode.typo_main};
  }
`;

const InfoLabel = styled.label<{ $isDescription: boolean }>`
  color: ${({ theme }) => theme.mode.typo_main};
  text-align: center;
  font-size: 1rem;
  line-height: ${({ $isDescription }) => ($isDescription ? '20px' : '34px')};
  height: auto;
  width: 100%;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  justify-content: center;
`;

const InfoLabelWrapper = styled.div`
  height: 100%;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

const InfoDescription = styled.span`
  color: ${customize.gray['400']};
  font-size: 10px;
  line-height: 14px;
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export default function RadioButton<T extends string | number>({
  label,
  value,
  options,
  onChange,
  isValid,
  useValidation,
  errorMessage,
  disabled,
}: IProps<T>) {
  return (
    <>
      <Container>
        {label ? (
          <>
            <Heading>{label}</Heading>
          </>
        ) : (
          ''
        )}
        <Wrapper>
          {options &&
            options.map((option) => (
              <Label $isChecked={option.value === value} key={option.label}>
                <Input
                  type="radio"
                  id={`radio-${option.value}`}
                  checked={value === option.value}
                  onChange={() => {
                    onChange && onChange(option.value);
                  }}
                  disabled={disabled}
                />
                <InfoLabel
                  $isDescription={!!option.description}
                  htmlFor={`radio-${option.value}`}
                >
                  <InfoLabelWrapper>
                    {option.icon && <Icon>{option.icon}</Icon>}
                    <div>{option.label}</div>
                  </InfoLabelWrapper>
                  {option.description && (
                    <InfoDescription>{option.description}</InfoDescription>
                  )}
                </InfoLabel>
              </Label>
            ))}
        </Wrapper>
        {errorMessage && isValid && useValidation && (
          <ErrorMessage message={errorMessage} />
        )}
      </Container>
    </>
  );
}
