import pytest
from models.plan import Plan
from exceptions.plan_errors import PlanNotFoundError
from models.user import User
from datetime import datetime

# Fixture to create a sample user for testing
@pytest.fixture
def sample_user():
    return User(username="test_user")

# Fixture to create a sample plan for testing
@pytest.fixture
def sample_plan(sample_user):
    return Plan(name="Test Plan",
                description="A test plan",
                date=datetime(2023, 12, 24),
                location="Test Location",
                admin=sample_user,
                participants=[sample_user],
                uid="test_plan_id")

def test_new_plan(sample_plan):
    assert sample_plan.name == "Test Plan"
    assert sample_plan.uid == "test_plan_id"

def test_plan_json(sample_plan, sample_user):
    expected = {
        'id': 'test_plan_id',
        'name': 'Test Plan',
        'description': 'A test plan',
        'date': '24/12/2023',
        'location': 'Test Location',
        'admin': sample_user,
        'participants': [sample_user.json()]
    }
    assert expected == sample_plan.json(return_full=True)

def test_create_plan(sample_plan):
    sample_plan.add_plan()
    assert sample_plan.uid is not None
    sample_plan.delete_plan()

def test_get_plan_by_id(sample_plan):
    sample_plan.add_plan()
    retrieved_plan = Plan.get_plan_by_id(sample_plan.uid)
    assert retrieved_plan.name == sample_plan.name
    assert retrieved_plan.uid == sample_plan.uid
    sample_plan.delete_plan()

def test_get_non_existing_plan():
    with pytest.raises(PlanNotFoundError):
        Plan.get_plan_by_id("non_existing_plan_id")

def test_update_plan(sample_plan):
    sample_plan.add_plan()
    sample_plan.name = "Updated Test Plan"
    sample_plan.update_plan()
    updated_plan = Plan.get_plan_by_id(sample_plan.uid)
    assert updated_plan.name == "Updated Test Plan"
    sample_plan.delete_plan()

def test_delete_plan(sample_plan):
    sample_plan.add_plan()
    sample_plan.delete_plan()
    with pytest.raises(PlanNotFoundError):
        Plan.get_plan_by_id(sample_plan.uid)

def test_add_participant(sample_plan):
    sample_plan.add_plan()
    new_participant = User(username="new_participant")
    new_participant.add_user()
    sample_plan.add_participant(new_participant.uuid)
    updated_plan = Plan.get_plan_by_id(sample_plan.uid)
    assert new_participant.uuid in [p.uuid for p in updated_plan.get_plan_participants()]
    updated_plan.delete_plan()
    new_participant.delete_user()

# def test_remove_participant(sample_plan, sample_user):
#     sample_user.add_user()
#     sample_plan.add_plan()
#     sample_plan.remove_participant(sample_user.uuid)
#     updated_plan = Plan.get_plan_by_id(sample_plan.uid)
#     assert sample_user.uuid not in [p.uuid for p in updated_plan.get_plan_participants()]
#     sample_plan.delete_plan()
#     sample_user.delete_user()

def test_get_user_plans(sample_plan, sample_user):
    sample_user.add_user()
    sample_plan.add_plan()
    user_plans = Plan.get_user_plans(sample_user.uuid)
    assert sample_plan.uid in [p.uid for p in user_plans]
    sample_plan.delete_plan()
    sample_user.delete_user()
