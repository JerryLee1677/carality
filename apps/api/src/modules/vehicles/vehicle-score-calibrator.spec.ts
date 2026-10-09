import {
  buildScoreCalibration,
  calibrateCoreScores,
  type CalibrationVehicle,
} from "./vehicle-score-calibrator";

function vehicle(
  energyType: string,
  scores: Partial<CalibrationVehicle["coreScores"]>,
): CalibrationVehicle {
  return {
    energyType,
    bodyType: "三厢车",
    coreScores: {
      handlingScore: 60,
      comfortScore: 60,
      spaceScore: 60,
      smartScore: 60,
      powerScore: 60,
      economyScore: 60,
      brandScore: 60,
      designScore: 60,
      reliabilityScore: 60,
      familyScore: 60,
      ...scores,
    },
  };
}

describe("vehicle score calibrator", () => {
  it("aligns external score distributions to reference vehicles", () => {
    const reference = [
      vehicle("EV", { powerScore: 50 }),
      vehicle("EV", { powerScore: 60 }),
      vehicle("EV", { powerScore: 70 }),
    ];
    const external = [
      vehicle("EV", { powerScore: 10 }),
      vehicle("EV", { powerScore: 20 }),
      vehicle("EV", { powerScore: 30 }),
    ];
    const calibration = buildScoreCalibration(reference, external);
    const calibrated = calibrateCoreScores(
      external[1].coreScores,
      calibration,
      external[1],
    );

    expect(calibrated.powerScore).toBe(60);
  });

  it("keeps energy groups independent", () => {
    const reference = [
      vehicle("EV", { powerScore: 50 }),
      vehicle("EV", { powerScore: 60 }),
      vehicle("ICE", { powerScore: 70 }),
      vehicle("ICE", { powerScore: 80 }),
    ];
    const external = [
      vehicle("EV", { powerScore: 10 }),
      vehicle("EV", { powerScore: 30 }),
      vehicle("ICE", { powerScore: 10 }),
      vehicle("ICE", { powerScore: 30 }),
    ];
    const calibration = buildScoreCalibration(reference, external);

    expect(
      calibrateCoreScores(external[0].coreScores, calibration, external[0]).powerScore,
    ).toBeLessThan(
      calibrateCoreScores(external[2].coreScores, calibration, external[2]).powerScore,
    );
  });

  it("clamps calibrated scores between 35 and 92", () => {
    const reference = [
      vehicle("EV", { powerScore: 40 }),
      vehicle("EV", { powerScore: 90 }),
    ];
    const external = [
      vehicle("EV", { powerScore: 50 }),
      vehicle("EV", { powerScore: 100 }),
    ];
    const extreme = {
      ...external[0],
      coreScores: { ...external[0].coreScores, powerScore: 200 },
    };
    const calibration = buildScoreCalibration(reference, external);

    expect(calibrateCoreScores(extreme.coreScores, calibration, extreme).powerScore).toBe(92);
  });
});
