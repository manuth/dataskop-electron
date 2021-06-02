import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../components/Button';
import ResultsDetails from '../components/results/ResultDetails';
import routes from '../router/constants.json';

export default function ResultsDetailsPage() {
  const { sessionId }: { sessionId: string } = useParams();
  const history = useHistory();

  return (
    <>
      <div className="bg-gray-50 overflow-hidden rounded-lg px-4 py-5 sm:p-6 space-x-4">
        <Button onClick={() => history.goBack()}>Go back</Button>

        <Button
          onClick={() =>
            history.push(
              routes.VISUALIZATION_ADVANCED.replace(':sessionId', sessionId),
            )
          }
        >
          Show visualizations
        </Button>
      </div>
      <ResultsDetails sessionId={sessionId} />
    </>
  );
}
