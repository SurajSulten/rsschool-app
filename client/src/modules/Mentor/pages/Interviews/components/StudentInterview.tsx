import { Col, Tag, Row, Button, Typography, Space } from 'antd';
import { GithubAvatar } from 'components/GithubAvatar';
import { getInterviewFeedbackUrl } from 'domain/interview';
import { MentorInterview } from 'services/course';
import css from 'styled-jsx/css';

export function StudentInterview(props: { interview: MentorInterview; template?: string | null; courseAlias: string }) {
  const { interview, template, courseAlias } = props;
  const { student, completed } = interview;
  return (
    <Col className={containerClassName}>
      <Space size={21} direction="vertical" style={{ width: '100%' }}>
        <Row justify="space-between" align="middle">
          <Tag color={interview.completed ? 'green' : undefined}>
            {interview.completed ? 'Completed' : 'Uncompleted'}
          </Tag>
          <Button
            type="primary"
            ghost
            size="small"
            href={getInterviewFeedbackUrl({
              courseAlias,
              interviewName: interview.name,
              studentGithubId: student.githubId,
              template: template,
            })}
          >
            {completed ? 'Edit feedback' : 'Provide feedback'}
          </Button>
        </Row>
        <Row>
          <Space size={14} align="baseline">
            <GithubAvatar githubId={student.githubId} size={24} />
            <Col>
              <Typography.Title level={5}> {student.name || student.githubId}</Typography.Title>
            </Col>
          </Space>
        </Row>
      </Space>
      {containerStyles}
    </Col>
  );
}

const { className: containerClassName, styles: containerStyles } = css.resolve`
  div {
    border: 1px solid rgba(245, 245, 245, 1);
    padding: 16px;
  }
  div + div {
    border-top: none;
  }

  div:first-child {
    margin-top: 15px;
  }
`;
