import React, { useContext } from "react";

import { SUNNYSIDE } from "assets/sunnyside";
import { useAppTranslation } from "lib/i18n/useAppTranslations";
import { OuterPanel } from "components/ui/Panel";
import coins from "assets/icons/coins.webp";
import { Label } from "components/ui/Label";
import { PortalMachineState } from "../../lib/Machine";
import { useSelector } from "@xstate/react";
import { PortalContext } from "../../lib/PortalProvider";
import { secondsToString } from "lib/utils/time";
import { PORTAL_NAME } from "../../Constants";

const _dailyHighscore = (state: PortalMachineState) => {
  const dateKey = new Date().toISOString().slice(0, 10);
  const minigame = state.context.state?.minigames.games[PORTAL_NAME];
  const history = minigame?.history ?? {};

  return history[dateKey]?.highscore ?? 0;
};
const _prize = (state: PortalMachineState) => {
  return state.context.state?.minigames.prizes[PORTAL_NAME];
};

export const Prize: React.FC = () => {
  const { portalService } = useContext(PortalContext);
  const { t } = useAppTranslation();

  const prize = useSelector(
    portalService,
    _prize,
    (prev, next) => JSON.stringify(prev) === JSON.stringify(next),
  );
  const dailyHighscore = useSelector(portalService, _dailyHighscore);

  if (!prize) {
    return (
      <OuterPanel>
        <div className="px-1">
          <Label type="danger" icon={SUNNYSIDE.icons.sad}>
            {t(`${PORTAL_NAME}.noPrizesAvailable`)}
          </Label>
        </div>
      </OuterPanel>
    );
  }

  const isComplete = dailyHighscore > prize.score;
  const secondsLeft = (prize.endAt - Date.now()) / 1000;

  return (
    <OuterPanel>
      <div className="px-1">
        <span className="text-xs mb-2">
          {t(`${PORTAL_NAME}.portal.missionObjectives`, {
            targetScore: prize.score,
          })}
        </span>
        <div className="flex justify-between mt-2 flex-wrap">
          {isComplete ? (
            <Label type="success" icon={SUNNYSIDE.icons.confirm}>
              {t(`${PORTAL_NAME}.completed`)}
            </Label>
          ) : (
            <Label type="info" icon={SUNNYSIDE.icons.stopwatch}>
              {secondsToString(secondsLeft, { length: "medium" })}
            </Label>
          )}
          <div className="flex items-center space-x-2">
            {!!prize.coins && (
              <Label icon={coins} type="warning">
                {prize.coins}
              </Label>
            )}
          </div>
        </div>
      </div>
    </OuterPanel>
  );
};
