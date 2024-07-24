// src/components/ActivityOutlet.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActivityCards } from '../../featrues/activitySlice';
import { Activity } from '../Common/Activity';
import { handleHeading } from '../../api';
import HeadingLayout from '../Common/HeadingLayout';

const ActivityOutlet = () => {
  const dispatch = useDispatch();
  const { cards = [], loading, error } = useSelector((state) => state.activity || {});
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchActivityCards());
  }, [dispatch]);

  useEffect(() => {
    console.log('Redux state cards:', cards);
  }, [cards]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredCards = user
    ? cards.filter(card => card.id === user.userid.toString())
    : cards;

  return (
    <div className="layout-max-width p-160 mx-auto padding-md p-sm-60">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 col-sm-12 col-lg-8 d-flex flex-column gap-1">
            <HeadingLayout id="1" handleHeading={handleHeading} />
          </div>
        </div>
        <div className="row gap-20 mt-5">
          {filteredCards.map(item => (
            <Activity
              key={item.id}
              card_description={item.description}
              card_title={item.title}
              card_image={item.card_image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityOutlet;
